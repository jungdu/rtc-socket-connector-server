import { createServer, Server as HttpServer } from "http";
import { Server } from "socket.io";
import { addRTCConnectionHandlers } from "./addRTCConnectionHandlers";
import { io as Client, Socket as ClientSocket } from "socket.io-client";

const PORT = 3010;

describe("addRTCConnectionHandlers", () => {
	test("Client connect to server", (done) => {
		const httpServer = createServer();
		const socketServer = new Server(httpServer);
		addRTCConnectionHandlers(socketServer, { debug: true });
		httpServer.listen(PORT, () => {
			const clientSocket = Client(`http://localhost:${PORT}`);
			clientSocket.on("connect", () => {
				httpServer.close();
				socketServer.close();
				done();
			});
		});
	});

	describe("Client send message for connecting", () => {
		let httpServer: HttpServer;
		let socketServer: Server;
		let clientSocketA: ClientSocket;
		let clientSocketB: ClientSocket;

		beforeAll((done) => {
			httpServer = createServer();
			socketServer = new Server(httpServer);
			addRTCConnectionHandlers(socketServer, { debug: true });
			httpServer.listen(PORT, () => {
				Promise.all([getConnectedClient(), getConnectedClient()]).then(
					([a, b]) => {
						clientSocketA = a;
						clientSocketB = b;
						done();
					}
				);
			});
		});

		afterAll(() => {
			httpServer.close();
			socketServer.close();
		});

		test("clientA send offer to clientB", (done) => {
			const offer = {
				answerSocketId: clientSocketB.id,
				offerMessage: "offer message from clientA",
			};

			clientSocketB.on("offer", (arg) => {
				expect(arg).toEqual(offer);
				done();
			});
			clientSocketA.emit("offer", offer);
		});

		test("clientA send answer to clientB", (done) => {
			const answer = {
				offerSocketId: clientSocketB.id,
				answerMessage: "answer message from clientB",
			};

			clientSocketB.on("answer", (arg) => {
				expect(arg).toEqual(answer);
				done();
			});
			clientSocketA.emit("answer", answer);
		});

		test("clientA send candidate to clientB", (done) => {
			const candidate = {
				destSocketId: clientSocketB.id,
				candidateMessage: "candidate message from clientA",
			};

			clientSocketB.on("candidate", (arg) => {
				expect(arg).toEqual(candidate);
				done();
			});
			clientSocketA.emit("candidate", candidate);
		});
	});
});

function getConnectedClient() {
	return new Promise<ClientSocket>((resolve) => {
		const clientSocket = Client(`http://localhost:${PORT}`);
		clientSocket.on("connect", () => {
			resolve(clientSocket);
		});
	});
}

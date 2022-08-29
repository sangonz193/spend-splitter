import { ChildProcess } from "child_process"

/**
 * Returns a promise that resolves when the child process exits, or rejects if the child process fails.
 */
export function promiseFromChildProcess(child: ChildProcess): Promise<void> {
	return new Promise((resolve, reject) => {
		child.on("error", reject)
		child.on("exit", (code) => {
			if (code === 0) {
				resolve()
			} else {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				reject(new Error(`Child process exited with code ${code?.toString()}`))
			}
		})
	})
}

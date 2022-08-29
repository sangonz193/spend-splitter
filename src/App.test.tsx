import { render, screen } from "@testing-library/react"

import { App } from "./App"

test("renders two `Add` buttons ", () => {
	render(<App />)
	const linkElement = screen.getAllByText("Add")
	expect(linkElement.length).toBe(2)
})

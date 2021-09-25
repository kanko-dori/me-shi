import { greeting } from "../src/lambda/handlers/resolvers/user"

test('call me taka', () => {
    expect(greeting('taka')).toBe('hello taka')
})
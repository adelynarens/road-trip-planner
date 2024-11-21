import { Get, Route } from 'tsoa';

@Route('hello')
export class HelloController {

    @Get('/hello')
    public async sayHelloWorld(): Promise<string> {
        return 'Hello, world!';
    }
}
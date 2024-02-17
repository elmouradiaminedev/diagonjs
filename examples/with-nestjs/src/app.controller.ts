import { Body, Controller, Post } from '@nestjs/common';
import Diagon from "diagonjs"

@Controller()
export class AppController {
  constructor() { }

  @Post("math")
  async math(@Body() body: { expression: string }) {
    const diagon = await Diagon.init();

    if (body.expression) {
      return diagon.translate.math(body.expression);
    }
    return ""
  }
}

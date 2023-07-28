export class Helper {
  private readonly regex = {
    functionName: /^function\s*([^\s(]+)/,
  };

  getRegex() {
    return this.regex;
  }
}

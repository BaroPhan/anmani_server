export class Helper {
  static readonly regex: {
    functionName: RegExp;
    phoneNumber: RegExp;
  } = {
    functionName: /^function\s*([^\s(]+)/,
    phoneNumber: /^(?:(?:\+?84|0)(?: ?|-?)(?:\d(?: ?|-?)?){9})$/,
  };

  capitalizeFirstLetter(text: string) {
    return text.length === 0
      ? text
      : text.charAt(0).toUpperCase() + text.slice(1);
  }
}

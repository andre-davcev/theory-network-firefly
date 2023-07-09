export enum Regex {
  Numbers = '^[0-9]*$',
  Email = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',

  WebsiteSecure = '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',

  PasswordUpperLowerNumbers = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
}

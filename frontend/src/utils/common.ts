export const validateEmail = (email: string) => {
  return new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getInitials = (name: string) => {
  const words: string[] = name.split(" ");
  const getChar = (word: string) => word.substring(0, 1);
  const initial: string =
    words.length > 1 ? getChar(words[0]) + getChar(words[1]) : getChar(name);
  return initial.toUpperCase();
};

export const createImageFromInitials = (
  size: number,
  name: string,
  color: string
) => {
  if (name == null) return "";
  name = getInitials(name);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return "";

  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export const createPascelCaseName = (input: string) => {
  if (!input) return input;
  const names: string[] = input.split("");
  return names
    .map((name) => name.charAt(0).toUpperCase() + name.substring(1))
    .join("");
};

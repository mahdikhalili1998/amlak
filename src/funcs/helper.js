const deleteHandlerd = (rules, index) => {
  const finder = rules.filter((item) => item !== rules[index]);
  return finder;
};

function maskEmail(email) {
  const [localPart, domainPart] = email.split("@");
  const maskedLocalPart =
    localPart.length > 3
      ? `${localPart.slice(0, 3)}***${localPart.slice(-1)}`
      : localPart;
  return `${maskedLocalPart}@${domainPart}`;
}

function getFirstWord(str) {
  // حذف فضاهای اضافی از ابتدا و انتهای رشته
  str = str.trim();

  // تقسیم رشته بر اساس فضای خالی
  const words = str.split(" ");

  // اگر رشته شامل بیش از یک کلمه باشد
  if (words.length > 1) {
    return `${words[0]} ،  ...`;
  } else {
    // اگر رشته فقط شامل یک کلمه باشد
    return words[0];
  }
}

export { deleteHandlerd, maskEmail, getFirstWord };

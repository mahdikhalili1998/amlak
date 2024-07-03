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

export { deleteHandlerd, maskEmail };
 
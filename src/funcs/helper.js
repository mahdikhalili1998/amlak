const deleteHandlerd = (rules, index) => {

  const finder = rules.filter((item) => item !== rules[index]);
  return finder;
};

export { deleteHandlerd };

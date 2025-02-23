const replaceTemplate = (temp, data) => {
  let output = temp.replace(/{{%PRODUCT_NAME%}}/g, data.productName);
  output = output.replace(/{{%ID%}}/g, data.id);
  output = output.replace(/{{%IMAGE%}}/g, data.image);
  output = output.replace(/{{%FROM%}}/g, data.from);
  output = output.replace(/{{%NUTRIENTS%}}/g, data.nutrients);
  output = output.replace(/{{%QUANTITY%}}/g, data.quantity);
  output = output.replace(/{{%PRICE%}}/g, data.price);
  output = output.replace(/{{%DESCRIPTION%}}/g, data.description);

  if (!data.organic) {
    return (output = output.replace(/{{%NOT_ORGANIC%}}/g, "not-organic"));
  }
  return output;
};

module.exports = replaceTemplate;

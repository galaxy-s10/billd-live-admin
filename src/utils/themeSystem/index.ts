const stylePools: string[] = [];
const styleIndex = 0;

export const generaterStyle = (data) => {
  const styleEle = document.createElement('style');
  const id = `generaterStyle-${styleIndex + 1}`;
  let styleContent = ':root {';
  Object.keys(data).forEach((key) => {
    const styleVal = data[key];
    styleContent += `${key}:${styleVal};`;
  });
  styleContent += '}';
  styleEle.textContent = styleContent;
  styleEle.id = id;
  stylePools.push(id);
  document.head.appendChild(styleEle);
};

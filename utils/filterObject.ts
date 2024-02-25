interface Obj {
  [key: string]: string | number;
}

interface stringObj {
  [key: string]: string;
}

const filterObject = (obj: any) => {
  let newObj: stringObj = {};
  for (const key in obj) {
    if (obj[key] !== "" && obj[key] !== undefined) {
      if (key === "month") {
        newObj[key] = obj[key].replace("월", "");
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};

export default filterObject;

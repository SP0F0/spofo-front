class CommonUtils {
  urlMatcher = (patterns: string[], url: string) =>
    patterns.find((elem: string) => elem.indexOf(url) > -1);
}

const commonUtils = new CommonUtils();
export default commonUtils;
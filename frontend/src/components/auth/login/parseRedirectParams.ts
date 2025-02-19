interface IRedirectParam {
  pathname: string;
  search: string;
}

export const parseRedirectParams = (redirect: string): IRedirectParam => {
  const url = new URL(
    decodeURIComponent(redirect),
    window.location.protocol + "//" + window.location.host,
  );

  return {
    pathname: url.pathname,
    search: url.search,
  };
};

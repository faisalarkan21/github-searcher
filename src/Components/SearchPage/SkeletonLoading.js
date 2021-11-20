import ContentLoader from "react-content-loader";

export const GridPageLoading = (props) => (
  <ContentLoader
    speed={3}
    width={350}
    height={300}
    viewBox="0 0 100 60"
    backgroundColor="#dfdddd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="1" width="200" height="500" />
  </ContentLoader>
);

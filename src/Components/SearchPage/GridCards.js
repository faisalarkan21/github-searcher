import { useSelector } from "react-redux";
import { GridPageLoading } from "./SkeletonLoading";
import "./styles/SearchPage.css";

export const GridCards = () => {
  const searchResult = useSelector((state) => state.searchResult);
  const isPageloading = useSelector((state) => state.isPageloading);
  const { data, typeSearch } = searchResult;

  const RenderUsersCards = () => {
    return data.map((v) => (
      <div className="gallery-item" key={v.id}>
        <aside
          className="profile-card pointer"
          onClick={() => window.open(v.html_url)}
        >
          <header>
            <div>
              <img alt="avatar" width={30} src={v.avatar_url} />
            </div>
            <div className="mt-4">
              <p>
                <b> {v?.name || "-"} </b>
              </p>
              <p>{v?.location || "-"}</p>
            </div>
          </header>
        </aside>
      </div>
    ));
  };

  const RenderRepositoriesCards = () => {
    return data.map((v) => (
      <div className="gallery-item" key={v.id}>
        <aside
          className="profile-card pointer"
          onClick={() => window.open(v.html_url)}
        >
          <header>
            <div>
              <img alt="avatar" width={50} src={v?.owner.avatar_url} />
            </div>
            <div className="mt-4">
              <p>{v.full_name}</p>
              <p>{v?.owner.login}</p>
              <p>{v?.stargazers_count} Stars</p>
            </div>
          </header>
        </aside>
      </div>
    ));
  };

  const handleRenderComponent = () => {
    let renderedComponent;
    if (isPageloading) {
      renderedComponent = Array(9)
        .fill("")
        .map(() => (
          <div className="item-loading">
            {" "}
            <GridPageLoading />{" "}
          </div>
        ));
    } else {
      switch (typeSearch) {
        case "users":
          renderedComponent = RenderUsersCards();
          break;
        case "repositories":
          renderedComponent = RenderRepositoriesCards();
          break;
        default:
          renderedComponent = null;
          break;
      }
    }
    return renderedComponent;
  };

  return (
    <div className="grid-container">
      <div className="gallery">{handleRenderComponent()}</div>
    </div>
  );
};

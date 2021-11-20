import GithubLogo from "../../assets/images/github-logo.png";
import "./styles/SearchPage.css";

export const SearchHeader = () => {
  return (
    <div className="flex">
      <div>
        <img alt="github-logo" src={GithubLogo} width={50}></img>
      </div>
      <div className="flex flex-column justify-content-center align-items-start ml-3">
        <label className="title">Github Searcher</label>
        <div>
          <label>Search users or repositories below</label>
        </div>
      </div>
    </div>
  );
};

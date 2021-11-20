import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import { getSearchData, resetParams } from "./services/SearchPage.reducer";
import "./styles/SearchPage.css";

export const Search = () => {
  const error = useSelector((state) => state.error);
  const isPageloading = useSelector((state) => state.isPageloading);
  const searchResult = useSelector((state) => state.searchResult);
  const dispatch = useDispatch();
  const inputValueRef = createRef();
  const [searchParams, setSearchParams] = useState({
    inputValue: "",
    comboBoxValue: "users",
  });
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const tempObj = { ...searchParams };
    tempObj["inputValue"] = "faisal";
    inputValueRef.current.value = "faisal";
    setSearchParams(tempObj);

    window.addEventListener("online", () => {
      toast.success("Kamu Online Kembali");
      setIsOffline(false);
    });
    window.addEventListener("offline", () => {
      toast.error("Kamu Offline");
      setIsOffline(true);
    });
  }, []);

  const handleDebouncedInput = useDebouncedCallback((value) => {
    const tempObj = { ...searchParams };
    tempObj["inputValue"] = value;
    setSearchParams(tempObj);
  }, 1500);

  const handleInput = (e) => {
    const tempObj = { ...searchParams };
    tempObj[e.target.name] = e.target.value;
    setSearchParams(tempObj);
  };

  const resetDataInput = () => {
    const tempObj = { ...searchParams };
    tempObj["inputValue"] = "";
    inputValueRef.current.value = "";
    setSearchParams(tempObj);
  };

  const isGridDataEmpty = () => {
    return (
      !searchResult.data.length && !isPageloading && searchParams.inputValue
    );
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    resetDataInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    const { inputValue } = searchParams;
    if (!inputValue) {
      return;
    }

    dispatch(getSearchData(inputValue, 0, searchParams.comboBoxValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.inputValue]);

  useEffect(() => {
    if (searchParams?.comboBoxValue && searchParams.inputValue) {
      resetDataInput();
      dispatch(resetParams());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.comboBoxValue]);

  return (
    <>
      <div className="flex mt-4">
        <div className="flex flex-wrap align-items-start">
          <div className="flex">
            <input
              onChange={(e) => handleDebouncedInput(e.target.value)}
              disabled={isOffline}
              className="search-input"
              name={"inputValue"}
              ref={inputValueRef}
              placeholder="Typing to search users or repositories"
            ></input>
          </div>
          <div className="flex">
            <select
              disabled={isOffline}
              name="comboBoxValue"
              onChange={handleInput}
              value={searchParams.comboBoxValue}
            >
              <option value="users">Users</option>
              <option value="repositories">Repositories</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div>
          <p className="error-message">{error}</p>
        </div>
      )}

      {isGridDataEmpty() && (
        <div>
          <p className="message">Tidak terdapat data pada query tersebut.</p>
        </div>
      )}
    </>
  );
};

import React, { SFC } from "react";
import { Input, Button, Layout } from "antd";
import { IHandleModalOpen, IHandleSearchInput } from "./types";

const { Search } = Input;
const { Header: AntdHeader } = Layout;

interface IHeader {
  handleSearchInput: IHandleSearchInput;
  handleModalOpen: IHandleModalOpen;
}

const Header: SFC<IHeader> = ({ handleSearchInput, handleModalOpen }) => (
  <AntdHeader>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        maxWidth: "960px",
        margin: "auto"
      }}
    >
      <Search
        placeholder="Search for a food"
        enterButton="Search"
        size="large"
        onSearch={handleSearchInput}
      />
      <div style={{ marginLeft: "20px" }}>
        <Button icon="plus" size="large" onClick={handleModalOpen} />
      </div>
    </div>
  </AntdHeader>
);

export default Header;

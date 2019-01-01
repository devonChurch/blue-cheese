import React, { Component } from "react";
import { Layout } from "antd";
import axios from "axios";
import {
  IFood,
  IHandleModalOpen,
  IHandleModalClose,
  IHandleSearchInput,
  IHandleCreateFood
} from "./types";
import Section from "./Section";
import Food from "./Food";
import Modal from "./Modal";
import Header from "./Header";

const endpoint = process.env.REACT_APP_ENDPOINT;

interface IProps {}

interface IState {
  isModalOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  searchValue: string;
  items: IFood[];
}

const resetModalFormState = () => ({
  isModalOpen: false
});

const resetSearchBarState = () => ({
  searchValue: ""
});

const resetFetchState = () => ({
  isLoading: false,
  isError: false,
  items: []
});

class App extends Component<IProps, IState> {
  state: IState = {
    ...resetSearchBarState(),
    ...resetModalFormState(),
    ...resetFetchState()
  };

  handleModalOpen: IHandleModalOpen = () => {
    this.setState(() => ({
      ...resetModalFormState(),
      isModalOpen: true
    }));
  };

  handleModalClose: IHandleModalClose = () => {
    this.setState(() => ({ isModalOpen: false }));
  };

  handleSearchInput: IHandleSearchInput = async (
    searchValue = ""
  ): Promise<void> => {
    if (!searchValue) return Promise.resolve();

    this.setState(prevState => ({
      ...prevState,
      searchValue,
      isLoading: true,
      isError: false
    }));

    try {
      const response = await axios({
        method: "get",
        url: `${endpoint}/api/search/${searchValue}`
      });

      this.setState(prevState => ({
        ...prevState,
        isLoading: false,
        items: response.data
      }));
    } catch (error) {
      this.setState(prevState => ({
        ...prevState,
        isLoading: false,
        isError: true,
        items: []
      }));
    }
  };

  handleCreateFood: IHandleCreateFood = async (item): Promise<void> => {
    this.setState(prevState => ({
      ...prevState,
      isLoading: true,
      isError: false
    }));

    try {
      await axios({
        method: "post",
        url: `${endpoint}/api/create`,
        data: item
      });

      this.setState(prevState => ({
        ...prevState,
        isLoading: false
      }));
    } catch (error) {
      this.setState(prevState => ({
        ...prevState,
        isLoading: false,
        isError: true
      }));
    }
  };

  render() {
    const {
      handleSearchInput,
      handleCreateFood,
      handleModalOpen,
      handleModalClose
    } = this;
    const { searchValue, isModalOpen, isLoading, isError, items } = this.state;
    const hasItems = Boolean(items && items.length);
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
           _                   _           
          | |_   ___  __ _  __| | ___  _ _ 
          | ' \ / -_)/ _` |/ _` |/ -_)| '_|
          |_||_|\___|\__,_|\__,_|\___||_|    
                                                                              */}
        <Header {...{ handleSearchInput, handleModalOpen }} />

        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                         _              _   
           __  ___  _ _ | |_  ___  _ _ | |_ 
          / _|/ _ \| ' \|  _|/ -_)| ' \|  _|
          \__|\___/|_||_|\__|\___||_||_|\__|  

          The query need "some" kind of content e.g a single space otherwise
          the GraphQL will error out and not recover (as am ID is required).
                                                                              */}
        <Section
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isError && !hasItems}
          isSuccess={!isError && hasItems}
        >
          {items.map(item => (
            <Food {...item} key={item.id} />
          ))}
        </Section>

        {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                          _        _ 
           _ __   ___  __| | __ _ | |
          | '  \ / _ \/ _` |/ _` || |
          |_|_|_|\___/\__,_|\__,_||_|  
                                                                              */}
        <Modal
          {...{
            isModalOpen,
            handleCreateFood,
            handleModalClose
          }}
        />
      </Layout>
    );
  }
}

export default App;

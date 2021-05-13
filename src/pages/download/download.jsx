import React, { Component } from "react";
import { Flex, Button } from "antd-mobile";
import axios from "axios";

export default class download extends Component {
  state = {
    loaded: 0,
  };
  startDownload = () => {
    axios({
      url: "/test.pdf",
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        // Do whatever you want with the native progress event
        // console.log(progressEvent);
        this.setState({ loaded: progressEvent.loaded });
      },
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };
  render() {
    const { loaded } = this.state;
    return (
      <Flex>
        <Flex.Item>
          <Button type="primary" onClick={this.startDownload}>
            download
          </Button>
        </Flex.Item>
        <Flex.Item>{loaded}</Flex.Item>
      </Flex>
    );
  }
}

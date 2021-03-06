import React, { SFC } from "react";
import { Card, Button, Tag } from "antd";
import upperFirst from "lodash.upperfirst";
import { IFood } from "./types";

const Food: SFC<IFood> = ({ title, category, description, href, icon }) => (
  <Card
    title={`${icon} ${upperFirst(title)}`}
    style={{ marginBottom: "20px", maxWidth: "500px" }}
  >
    <div style={{ marginBottom: "15px" }}>
      <Tag>{category}</Tag>
    </div>
    <p>{description}</p>
    <Button type="primary" ghost href={href}>
      See More
    </Button>
  </Card>
);

export default Food;

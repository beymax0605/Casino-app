import React, {useEffect, useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { css } from "@emotion/core";
import "./Spinner.scss";
const override = css`
    border: 5px solid;
    border-color: #78bd1f;
    border-bottom-color: transparent;
`;

export const Spinner = (props: {pending: boolean}) => {
  const {pending} = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(pending);
  }, [pending]); // Only re-run the effect if count changes
  return (
    <div className="loading">
      <ClipLoader
        css={override}
        size={150}
        loading={loading}
      />
    </div>
  );
}

export default Spinner;

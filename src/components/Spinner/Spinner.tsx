import React, {useEffect, useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {connect} from "react-redux";
import {StoreType} from "../../redux/store.type";
import {getGamesSelector} from "../../redux/Game/selectors";
import {GameStateInterface} from "../../redux/Game/types/game-state.interface";
import { css } from "@emotion/core";
import "./Spinner.scss";
const override = css`
    border: 5px solid;
    border-color: #78bd1f;
    border-bottom-color: transparent;
`;

const Spinner = (props: {gameStore: GameStateInterface}) => {
  const {gameStore} = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(gameStore.pending), 1000);
  }, [gameStore.pending]); // Only re-run the effect if count changes
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

const mapStateToProps = (state: StoreType) => ({
  gameStore: getGamesSelector(state)
})

export default connect(
  mapStateToProps
)(Spinner);

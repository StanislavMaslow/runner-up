import {
  StyleSheet,
} from 'react-native';

export const sideStageStyleSelector = (size) => {
  const sideStageStyles = StyleSheet.create({
    sideStageLg: {
      paddingBottom: 80,
    },
    sideStageMd: {
      paddingBottom: 80,
    },
    sideStageXs: {
      height: '40%',
      paddingBottom: 70,
    },
  });
  switch (size) {
    case 'lg':
      return sideStageStyles.sideStageLg;
    case 'md':
      return sideStageStyles.sideStageMd;
    case 'xs':
      return sideStageStyles.sideStageXs;
    default:
      return sideStageStyles.sideStageMd;
  }
};

export const stageStyleSelector = (size) => {
  const stageStyles = StyleSheet.create({
    stageLg: {
      height: 260,
    },
    stageMd: {
      height: 260,
    },
    stageXs: {
      height: 220,
    },

  });
  switch (size) {
    case 'lg':
      return stageStyles.stageLg;
    case 'md':
      return stageStyles.stageMd;
    case 'xs':
      return stageStyles.stageXs;
    default:
      return stageStyles.stageMd;
  }
};

export const boardTitleBlockStyleSelector = (size) => {
  const boardTitleBlockStyles = StyleSheet.create({
    boardTitleBlockLg: {
      height: 80,
    },
    boardTitleBlockMd: {
      height: 50,
    },
    boardTitleBlockXs: {
      paddingTop: 15,
      height: 50,
    },
  });
  switch (size) {
    case 'lg':
      return boardTitleBlockStyles.boardTitleBlockLg;
    case 'md':
      return boardTitleBlockStyles.boardTitleBlockMd;
    case 'xs':
      return boardTitleBlockStyles.boardTitleBlockXs;
    default:
      return boardTitleBlockStyles.boardTitleBlockMd;
  }
};

export const backgroungGradientStyleSelector = (size) => {
  const backgroungGradientStyles = StyleSheet.create({
    backgroungGradientLg: {
      height: 150,
    },
    backgroungGradientMd: {
      height: 140,
    },
    backgroungGradientXs: {
      height: 130,
    },
  });
  switch (size) {
    case 'lg':
      return backgroungGradientStyles.backgroungGradientLg;
    case 'md':
      return backgroungGradientStyles.backgroungGradientMd;
    case 'xs':
      return backgroungGradientStyles.backgroungGradientXs;
    default:
      return backgroungGradientStyles.backgroungGradientMd;
  }
};

export const stageCardStyleSelector = (size) => {
  const stageCardStyles = StyleSheet.create({
    stageCardLg: {
      width: 105,
      height: 225,

    },
    stageCardMd: {
      width: 105,
      height: 210,
    },
    stageCardXs: {
      width: 95,
      height: 180,
    },
  });
  switch (size) {
    case 'lg':
      return stageCardStyles.stageCardLg;
    case 'md':
      return stageCardStyles.stageCardMd;
    case 'xs':
      return stageCardStyles.stageCardXs;
    default:
      return stageCardStyles.stageCardMd;
  }
};

export const backgroundCardStyleSelector = (size) => {
  const bakcgroundCardStyles = StyleSheet.create({
    bakcgroundCardLg: {
      width: 105,
      height: 230,
    },
    bakcgroundCardMd: {
      width: 105,
      height: 215,
    },
    bakcgroundCardXs: {
      width: 95,
      height: 185,
    },
  });
  switch (size) {
    case 'lg':
      return bakcgroundCardStyles.bakcgroundCardLg;
    case 'md':
      return bakcgroundCardStyles.bakcgroundCardMd;
    case 'xs':
      return bakcgroundCardStyles.bakcgroundCardXs;
    default:
      return bakcgroundCardStyles.bakcgroundCardMd;
  }
};

export const avatarNameStyleSelector = (size) => {
  const avatarNameStyles = StyleSheet.create({
    avatarNameLg: {
      marginTop: 5,
      fontSize: 18,
      lineHeight: 20,
    },
    avatarNameMd: {
      marginTop: 5,
      fontSize: 18,
      lineHeight: 20,
    },
    avatarNamexs: {
      marginTop: 0,
      height: 40,
      padding: 2,
      fontSize: 15,
      lineHeight: 14,
    },
  });
  switch (size) {
    case 'lg':
      return avatarNameStyles.avatarNameLg;
    case 'md':
      return avatarNameStyles.avatarNameMd;
    case 'xs':
      return avatarNameStyles.avatarNamexs;
    default:
      return avatarNameStyles.avatarNameMd;
  }
};

export const cardTextStyleSelector = (size) => {
  const cardTextStyles = StyleSheet.create({
    cardTextLg: {
      fontSize: 14,
    },
    cardTextMd: {
      fontSize: 14,
    },
    cardTextXs: {
      fontSize: 12,
    },
  });
  switch (size) {
    case 'lg':
      return cardTextStyles.cardTextLg;
    case 'md':
      return cardTextStyles.cardTextMd;
    case 'xs':
      return cardTextStyles.cardTextXs;
    default:
      return cardTextStyles.cardTextMd;
  }
};

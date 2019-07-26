import React from 'react';

import { Quest as QuestType } from '../../../types';

interface Props {
  selectedQuest: QuestType;
}

export default function Quest({ selectedQuest }: Props) {
  return selectedQuest && <div>{selectedQuest.title}</div>;
}

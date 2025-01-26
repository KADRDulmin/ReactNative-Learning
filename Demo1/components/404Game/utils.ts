// app/components/404Game/utils.ts
import { SCORE_MESSAGES } from './constants';

export const getScoreMessage = (score: number) => {
    if (score < 5) return SCORE_MESSAGES.beginner;
    if (score < 15) return SCORE_MESSAGES.intermediate;
    return SCORE_MESSAGES.expert;
};
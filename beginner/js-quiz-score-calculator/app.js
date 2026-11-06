function validateQuizData(questions, userAnswers) {
    const questionIds = questions.map(q => q.id);
    if (new Set(questionIds).size !== questionIds.length) {
        throw new Error("Duplicate question id.");
    }

    for (const question of questions) {
        if (question.id == null) {
            throw new Error("Question id is missing.");
        }
        if (!question.correctAnswer) {
            throw new Error(`Question ${question.id} has no correct answer.`);
        }
    }

    for (const answer of userAnswers) {
        if (answer.questionId == null) {
            throw new Error("Answer has no questionId.");
        }
    }

    for (const answer of userAnswers) {
        const exists = questions.some(q => q.id === answer.questionId);
        if (!exists) {
            throw new Error(`Question ${answer.questionId} does not exist.`);
        }
    }

    const answerIds = userAnswers.map(a => a.questionId);
    if (new Set(answerIds).size !== answerIds.length) {
        throw new Error("Duplicate answers.");
    }

    const validOptions = ["A", "B", "C", "D"];
    for (const answer of userAnswers) {
        if (!validOptions.includes(answer.answer)) {
            throw new Error(`Invalid answer: ${answer.answer}`);
        }
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Questions are empty.");
    }
    if (!Array.isArray(userAnswers)) {
        throw new Error("Invalid answers.");
    }

    if (questions.length !== userAnswers.length) {
        throw new Error("Number of answers does not match number of questions.");
    }
}


function isAnswerCorrect(question, userAnswer) {
    if (!userAnswer) return false;
    return question.correctAnswer === userAnswer.answer;
}

function countCorrectAnswers(questions, userAnswers) {
    let correctCount = 0;
    for (const question of questions) {
        const userAnswer = userAnswers.find((answer) => {
        return answer.questionId === question.id;
        });
        if (isAnswerCorrect(question, userAnswer)) correctCount += 1;
    }
    return correctCount;
}

function calculatePercentage(correctCount, totalQuestions) {
    if (totalQuestions === 0) return 0;
    return (correctCount / totalQuestions) * 100;
}

function getResultMessage(percentage) {
    if (percentage >= 80) return 'Great work';
    if (percentage >= 60) return 'You passed';
    return 'Keep practicing';
}

function createQuizResult(questions, userAnswers) {
    validateQuizData(questions, userAnswers);
    const correctCount = countCorrectAnswers(questions, userAnswers);
    const totalQuestions = questions.length;
    const percentage = calculatePercentage(correctCount, totalQuestions);
    const message = getResultMessage(percentage);
    return {
        correctCount,
        totalQuestions,
        percentage,
        message,
    };
}

const questions = [
    { id: 1, correctAnswer: 'B' },
    { id: 2, correctAnswer: 'A' },
    { id: 3, correctAnswer: 'D' },
    { id: 4, correctAnswer: 'C' },
];

const userAnswers = [
    { questionId: 1, answer: 'B' },
    { questionId: 2, answer: 'C' },
    { questionId: 3, answer: 'D' },
    { questionId: 4, answer: 'C' },
];

console.log(createQuizResult(questions, userAnswers));
console.log(countCorrectAnswers(questions, userAnswers));
console.log(calculatePercentage(3, questions.length));

const partialAnswers = [{ questionId: 1, answer: 'B' }];
console.log(createQuizResult(questions, partialAnswers));
console.log(userAnswers.length === questions.length)
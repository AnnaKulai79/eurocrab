package ua.eurocrab.service;

import ua.eurocrab.domain.FeedbackDTO;
import ua.eurocrab.domain.ReviewsDTO;

import java.util.List;

public interface FeedbackService {
    List<FeedbackDTO> findAllFeedback();

    FeedbackDTO saveFeedback(FeedbackDTO feedbackDTO);

    void deleteFeedback(Long id);
}

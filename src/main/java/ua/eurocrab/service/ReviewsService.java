package ua.eurocrab.service;

import ua.eurocrab.domain.ReviewsDTO;

import java.util.List;

public interface ReviewsService {
    List<ReviewsDTO> findReviewsByProductId(Long id);

    List<ReviewsDTO> findAllReviews();

    ReviewsDTO saveReviews(ReviewsDTO reviewsDTO);

    ReviewsDTO updateReviews(Long id);

    void deleteReview(Long id);
}

package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.ReviewsDTO;
import ua.eurocrab.service.ReviewsService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("reviews")
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<ReviewsDTO> reviewsDTOs = reviewsService.findAllReviews();
        return new ResponseEntity<>(reviewsDTOs,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveReviews(@RequestBody ReviewsDTO reviewsDTO) {
        ReviewsDTO reviews = reviewsService.saveReviews(reviewsDTO);
        return new ResponseEntity<>(reviews, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateReviews(@PathVariable("id") Long id) {
        ReviewsDTO review = reviewsService.updateReviews(id);
        if (review==null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(review,HttpStatus.OK);
    }

    @DeleteMapping(value = "{id}")
    public boolean deleteReviews(@PathVariable("id") Long id) {
        reviewsService.deleteReview(id);
        return true;
    }


    @GetMapping("{id}")
    public ResponseEntity<?> findReviewsByProductId(@PathVariable("id") Long id) {
        List<ReviewsDTO> review = reviewsService.findReviewsByProductId(id);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

}

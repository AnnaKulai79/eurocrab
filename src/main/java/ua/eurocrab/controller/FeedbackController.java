package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.FeedbackDTO;
import ua.eurocrab.service.FeedbackService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@RestController
@RequestMapping("feedbacks")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<FeedbackDTO> feedbackDTOs = feedbackService.findAllFeedback();
        return new ResponseEntity<>(feedbackDTOs,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        FeedbackDTO feedbackDTOs = feedbackService.saveFeedback(feedbackDTO);
        return new ResponseEntity<>(feedbackDTOs, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "{id}")
    public boolean deleteAdmin(@PathVariable("id") Long id) {
        feedbackService.deleteFeedback(id);
        return true;
    }

}

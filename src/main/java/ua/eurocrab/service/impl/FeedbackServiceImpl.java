package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.FeedbackDTO;
import ua.eurocrab.entity.FeedbackEntity;
import ua.eurocrab.repository.FeedbackRepository;
import ua.eurocrab.service.FeedbackService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public List<FeedbackDTO> findAllFeedback() {
        return modelMapper.mapAll(feedbackRepository.findAll(),FeedbackDTO.class);
    }

    @Override
    public FeedbackDTO saveFeedback(FeedbackDTO feedbackDTO) {
        return modelMapper.map(feedbackRepository.save(modelMapper.map(feedbackDTO, FeedbackEntity.class)),FeedbackDTO.class);
    }

    @Override
    @Transactional
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}

package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.ReviewsDTO;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.entity.ReviewsEntity;
import ua.eurocrab.repository.ProductsRepository;
import ua.eurocrab.repository.ReviewsRepository;
import ua.eurocrab.service.ReviewsService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class ReviewsServiceImpl implements ReviewsService {
    @Autowired
    private ReviewsRepository reviewsRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Override
    public List<ReviewsDTO> findReviewsByProductId(Long id) {
        ProductsEntity product = productsRepository.findById(id).get();
        List<ReviewsEntity> reviews = reviewsRepository.findAllByProductId(product);
        return modelMapper.mapAll(reviews,ReviewsDTO.class);
    }

    @Override
    public List<ReviewsDTO> findAllReviews() {
        return modelMapper.mapAll(reviewsRepository.findAll(),ReviewsDTO.class);

    }

    @Override
    public ReviewsDTO saveReviews(ReviewsDTO reviewsDTO) {
        return modelMapper.map(reviewsRepository.save(modelMapper.map(reviewsDTO,ReviewsEntity.class)),ReviewsDTO.class);
    }

    @Override
    @Transactional
    public ReviewsDTO updateReviews(Long id) {
        boolean exists = reviewsRepository.existsById(id);
        if (!exists) {
            return null;
        }
        ReviewsEntity review = reviewsRepository.getOne(id);
        review.setModerat(true);
        reviewsRepository.save(review);
        return modelMapper.map(reviewsRepository.save(review),ReviewsDTO.class);
    }

    @Override
    @Transactional
    public void deleteReview(Long id) {
        reviewsRepository.deleteById(id);
    }
}

package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.FeedbackEntity;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.entity.ReviewsEntity;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity,Long> {
}

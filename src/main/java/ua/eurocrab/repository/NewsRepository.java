package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.NewsEntity;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {
}
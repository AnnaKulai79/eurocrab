package ua.eurocrab.service;

import ua.eurocrab.domain.NewsDTO;

import java.util.List;

public interface NewsService {
    List<NewsDTO> findAllNews();

    void deleteNews(Long id);

    NewsDTO saveNews(NewsDTO newsDTO);
}

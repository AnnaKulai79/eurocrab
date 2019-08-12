package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.NewsDTO;
import ua.eurocrab.service.NewsService;

import java.util.List;

@RestController
@RequestMapping("news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<NewsDTO> newsDTOs = newsService.findAllNews();
        return new ResponseEntity<>(newsDTOs,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> saveNews(@RequestBody NewsDTO newsDTO) {
        NewsDTO news = newsService.saveNews(newsDTO);
        return new ResponseEntity<>(news, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public boolean deleteNews(@PathVariable("id") Long id) {
        newsService.deleteNews(id);
        return true;
    }

}

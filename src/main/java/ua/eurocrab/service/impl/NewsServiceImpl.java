package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.NewsDTO;
import ua.eurocrab.entity.NewsEntity;
import ua.eurocrab.repository.NewsRepository;
import ua.eurocrab.service.NewsService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;


    @Override
    public List<NewsDTO> findAllNews() {
        List<NewsEntity> newsEntities = newsRepository.findAll();
        List<NewsDTO> newsDTOs = modelMapper.mapAll(newsEntities,NewsDTO.class);
        return newsDTOs;
    }

    @Override
    @Transactional
    public void deleteNews(Long id) {
       newsRepository.deleteById(id);
    }

    @Override
    public NewsDTO saveNews(NewsDTO newsDTO) {
        return modelMapper.map(newsRepository.save(modelMapper.map(newsDTO,NewsEntity.class)),NewsDTO.class);
    }

}

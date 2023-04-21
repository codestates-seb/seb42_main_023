package com.teamdragon.dragonmoney.app.domain.tag.service;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import com.teamdragon.dragonmoney.app.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class TagFindServiceImpl implements TagFindService {

    private final TagRepository tagRepository;

    // 태그 조회
    @Override
    public Optional<Tag> findTag(String tagName) {
        return tagRepository.findByName(tagName);
    }
}

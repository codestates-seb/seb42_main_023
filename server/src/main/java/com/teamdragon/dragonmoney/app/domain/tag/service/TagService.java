package com.teamdragon.dragonmoney.app.domain.tag.service;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import com.teamdragon.dragonmoney.app.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class TagService {

    private final TagRepository tagRepository;

    // 태그 목록 저장
    public List<Tag> saveListTag(List<String> tagNames) {
        List<Tag> tags = new ArrayList<>();
        for (String tagName : tagNames) {
            Tag tag = saveTag(tagName);
            tags.add(tag);
        }
        return tags;
    }

    // 태그 저장
    public Tag saveTag(String tagName){
        Optional<Tag> findTag = findTag(tagName); // 기존 태그 조회
        if (findTag.isPresent()) {
            return findTag.get();
        }
        Tag tag = Tag.builder()
                .name(tagName)
                .build();
        return tagRepository.save(tag);
    }

    // 태그 삭제 : 참조되는곳이 없는 태그 삭제
    public boolean removeOrphanTag() {
        tagRepository.deleteOrphanTag();
        return true;
    }

    // 태그 조회
    private Optional<Tag> findTag(String tagName) {
        return tagRepository.findByName(tagName);
    }
}

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
public class TagHandleServiceImpl implements TagHandleService {

    private final TagFindService tagFindService;
    private final TagRepository tagRepository;

    // 태그 목록 저장
    @Override
    public List<Tag> saveListTag(List<String> tagNames) {
        List<Tag> tags = new ArrayList<>();
        for (String tagName : tagNames) {
            Tag tag = saveTag(tagName);
            tags.add(tag);
        }
        return tags;
    }

    // 태그 삭제 : 참조되는곳이 없는 태그 삭제
    @Override
    public boolean removeOrphanTag() {
        tagRepository.deleteOrphanTag();
        return true;
    }

    // 태그 저장
    private Tag saveTag(String tagName){
        Optional<Tag> findTag = tagFindService.findTag(tagName);
        if (findTag.isPresent()) {
            return findTag.get();
        }
        Tag tag = Tag.builder()
                .name(tagName)
                .build();
        return tagRepository.save(tag);
    }
}

package com.teamdragon.dragonmoney.app.domain.tag.repository;

import com.teamdragon.dragonmoney.app.configuration.TestConfig;
import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

@Import(TestConfig.class)
@DataJpaTest
class TagRepositoryTest {

    @Autowired
    TagRepository tagRepository;

    @DisplayName("deleteOrphanTag Test")
    @Test
    public void deleteOrphanTagTest() {
        // given
        Tag tag1 = Tag.builder().name("태그1").build();
        Tag tag2 = Tag.builder().name("태그2").build();
        Tag tag3 = Tag.builder().name("태그3").build();

        tagRepository.save(tag1);
        tagRepository.save(tag2);
        tagRepository.save(tag3);

        // when
        tagRepository.deleteOrphanTag();

        // then
        Assertions.assertThat(tagRepository.findAll().size()).isEqualTo(0);
    }
}
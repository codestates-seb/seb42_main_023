package com.teamdragon.dragonmoney.app.domain.tag.service;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;

import java.util.Optional;

public interface TagFindService {

    Optional<Tag> findTag(String tagName);
}

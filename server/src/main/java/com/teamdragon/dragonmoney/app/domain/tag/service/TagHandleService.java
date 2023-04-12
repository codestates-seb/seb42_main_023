package com.teamdragon.dragonmoney.app.domain.tag.service;

import com.teamdragon.dragonmoney.app.domain.tag.entity.Tag;

import java.util.List;

public interface TagHandleService {

    List<Tag> saveListTag(List<String> tagNames);

    boolean removeOrphanTag();

}

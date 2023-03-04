# -*- coding: utf-8 -*-

import logging
import os
from lxml import etree

from odoo import tools

_logger = logging.getLogger(__name__)

_relaxng_cache = {}


def relaxng(view_type):
    if view_type not in _relaxng_cache:
        with tools.file_open(os.path.join('web_tree_footer_text', 'rng', '%s_view.rng' % view_type)) as frng:
            try:
                relaxng_doc = etree.parse(frng)
                _relaxng_cache[view_type] = etree.RelaxNG(relaxng_doc)
            except Exception:
                _logger.exception('Failed to load RelaxNG XML schema for views validation')
                _relaxng_cache[view_type] = None
    return _relaxng_cache[view_type]


tools.view_validation.relaxng = relaxng

# -*- coding: utf-8 -*-

from odoo import models, fields, api, _

class TestTree(models.Model):
    _name = 'test.tree'
    _description = 'Tree view for test purpose'

    name = fields.Char(
        string='Name',
        required=True,
        default=lambda self: _('New'),
        copy=False
    )

    
    test_int = fields.Integer(
        string='test_int', default=9
    )

    
    test_float = fields.Float(
        string='test_float', default=99.9
    )

    
    line_ids = fields.One2many(
        string='line',
        comodel_name='test.tree.line',
        inverse_name='test_tree_id',
    )
    


class TestTreeLine(models.Model):
    _name = 'test.tree.line'
    _description = 'Tree view line for test purpose'

    name = fields.Char(
        string='Name',
        required=True,
        default=lambda self: _('New'),
        copy=False
    )

    
    test_int = fields.Integer(
        string='test_int', default=9
    )

    
    test_float = fields.Float(
        string='test_float', default=99.9
    )

    
    test_tree_id = fields.Many2one(
        string='test_tree',
        comodel_name='test.tree',
    )
    
    
    
    

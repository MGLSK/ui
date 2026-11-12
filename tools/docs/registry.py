GROUPS = ['Layout', 'Navigation', 'Forms', 'Overlays', 'Data display', 'Feedback', 'Chat & AI']
REG = []
def C(slug, title, group, desc, demo, api=None, script='', stage='stack', style=''):
    assert group in GROUPS, group
    REG.append(dict(slug=slug, title=title, group=group, desc=desc, demo=demo, api=api or [], script=script, stage=stage, style=style))

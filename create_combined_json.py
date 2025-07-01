import json
import csv
from collections import defaultdict

def read_csv_to_dict(filename):
    """Read a CSV file and return a list of dictionaries"""
    data = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append(row)
    return data

def main():
    # Read all CSV files
    categories = read_csv_to_dict('exported_all_db/categories.csv')
    difficulties = read_csv_to_dict('exported_all_db/difficulty.csv')
    poses = read_csv_to_dict('exported_all_db/poses.csv')
    transitive_poses = read_csv_to_dict('exported_all_db/transitive_poses.csv')
    
    # Create dictionaries for quick lookup
    category_dict = {cat['id']: cat for cat in categories}
    difficulty_dict = {diff['id']: diff for diff in difficulties}
    pose_dict = {pose['id']: pose for pose in poses}
    
    # Group transitive relationships by pose_id
    pose_relationships = defaultdict(list)
    for rel in transitive_poses:
        pose_relationships[rel['pose_id']].append({
            'category_id': rel['category_id'],
            'difficulty_id': rel['difficulty_id']
        })
    
    # Build the final structure
    combined_data = {
        "metadata": {
            "total_poses": len(poses),
            "total_categories": len(categories),
            "total_difficulties": len(difficulties),
            "description": "Complete yoga pose database with categories, difficulties, and detailed pose information"
        },
        "categories": [
            {
                "id": int(cat['id']),
                "name": cat['category_name'],
                "description": cat['category_description']
            }
            for cat in categories
        ],
        "difficulties": [
            {
                "id": int(diff['id']),
                "level": diff['difficulty_level']
            }
            for diff in difficulties
        ],
        "poses": []
    }
    
    # Process each pose and add its relationships
    for pose in poses:
        pose_id = pose['id']
        
        # Get all categories and difficulties for this pose
        relationships = pose_relationships.get(pose_id, [])
        
        # Extract unique categories and difficulties
        pose_categories = []
        pose_difficulties = []
        
        for rel in relationships:
            cat_id = rel['category_id']
            diff_id = rel['difficulty_id']
            
            # Add category if not already added
            if cat_id in category_dict:
                cat_info = {
                    "id": int(cat_id),
                    "name": category_dict[cat_id]['category_name']
                }
                if cat_info not in pose_categories:
                    pose_categories.append(cat_info)
            
            # Add difficulty if not already added
            if diff_id in difficulty_dict:
                diff_info = {
                    "id": int(diff_id),
                    "level": difficulty_dict[diff_id]['difficulty_level']
                }
                if diff_info not in pose_difficulties:
                    pose_difficulties.append(diff_info)
        
        # Build the complete pose object
        pose_obj = {
            "id": int(pose['id']),
            "english_name": pose['english_name'],
            "sanskrit_name_adapted": pose['sanskrit_name_adapted'],
            "sanskrit_name": pose['sanskrit_name'],
            "translation_name": pose['translation_name'],
            "description": pose['pose_description'],
            "benefits": pose['pose_benefits'],
            "images": {
                "svg": pose['url_svg'],
                "png": pose['url_png'],
                "svg_alt": pose['url_svg_alt']
            },
            "categories": pose_categories,
            "difficulties": pose_difficulties
        }
        
        combined_data["poses"].append(pose_obj)
    
    # Sort poses by ID for consistency
    combined_data["poses"].sort(key=lambda x: x['id'])
    
    # Write the combined JSON file
    with open('yoga_database.json', 'w', encoding='utf-8') as f:
        json.dump(combined_data, f, indent=2, ensure_ascii=False)
    
    print(f"Successfully created yoga_database.json with:")
    print(f"- {len(combined_data['poses'])} poses")
    print(f"- {len(combined_data['categories'])} categories")
    print(f"- {len(combined_data['difficulties'])} difficulty levels")

if __name__ == "__main__":
    main() 